import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()
  return (
    <div>
      <Header />
      {session ? "you are logged in" : "you are not logged in "}
      <Footer />
    </div>
  );
}