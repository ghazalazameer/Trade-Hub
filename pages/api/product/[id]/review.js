import { createRouter } from "next-connect";
import db from "@/utils/db";
import Product from "@/models/Product";
import auth from "@/middleware/auth";

const router = createRouter().use(auth);

router.put(async (req, res) => {
  try {
    await db.connectDb();
    // Find the product by id........................................
    const product = await Product.findById(req.query.id);
    if (product) {
    // Check if the user has already reviewed the product...........
      const exist = product.reviews.find(
        (x) => x.reviewBy.toString() == req.user 
      );
      if (exist) {
        await Product.updateOne(
          {
            _id: req.query.id,
            "reviews._id": exist._id,
          },
          {
            $set: {
              "reviews.$.review": req.body.review,
              "reviews.$.rating": req.body.rating,
              "reviews.$.size": req.body.size,
              "reviews.$.fit": req.body.fit,
              "reviews.$.images": req.body.images,
              "reviews.$.style": req.body.style,
            },
          },
          {
            new: true,
          }
        );

        // Update the product rating and number of reviews............
        const updatedProduct = await Product.findById(req.query.id);
        updatedProduct.numReviews = updatedProduct.reviews.length;
        updatedProduct.rating =
          updatedProduct.reviews.reduce((a, r) => r.rating + a, 0) /
          updatedProduct.reviews.length;
        await updatedProduct.save();
        await updatedProduct.populate("reviews.reviewBy");
        await db.disconnectDb();
        return res
          .status(200)
          .json({ reviews: updatedProduct.reviews.reverse() });
      } else {
        // If the user has not reviewed the product yet, add review.......
        const review = {
          reviewBy: req.user,
          rating: req.body.rating,
          review: req.body.review,
          size: req.body.size,
          fit: req.body.fit,
          style: req.body.style,
          images: req.body.images,
        };
        // Add the review to the product.................................
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating =
          product.reviews.reduce((a, r) => r.rating + a, 0) /
          product.reviews.length;
        await product.save();
        await product.populate("reviews.reviewBy");
        await db.disconnectDb();
        return res.status(200).json({ reviews: product.reviews.reverse() });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router.handler();