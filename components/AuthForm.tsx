"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {z} from "zod";

import { Button } from "@/components/ui/button";
import {Form,} from "@/components/ui/form";

import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/Client";
import { signIn, signUp } from "@/lib/actions/Auth.action";

type FormType = "sign-in" | "sign-up";



const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ?  z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3)

});
}


const AuthForm = ({type}:{type: FormType}) => {

  const formSchema = authFormSchema(type);
  const router = useRouter();
  const form = useForm<z.infer <typeof formSchema >>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          email:"",
          password:""
        },
      });
    
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if(type === "sign-up"){

        const{name,email,password} = values

        const userCredentials = await createUserWithEmailAndPassword(auth,email,password)

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password
        })

        if(!result?.success){
          toast.error(result?.message)
          return
        }

        toast.success("Account created successfully. Please sign in.")
        router.push("/signin")
      }else{

        const {email, password} = values;
        
        const userCredentials = await signInWithEmailAndPassword(auth,email,password)

        const idToken = await userCredentials.user.getIdToken()

        if(!idToken){
          toast.error("Sign In Failed.")
          return;
        }

        await signIn({
          email,idToken
        })

        toast.success("Sign in successfully.")
        router.push("/")
      }
    } catch (error) {
      console.log(error)
      toast.error(`there was an error: ${error}`)
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px] ">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src={"/logo.svg"} width={38} height={32} alt="" />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>

        <h3>Practice job interview with AI</h3>
      
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full mt-4 form space-y-6">
        {!isSignIn && <FormField control={form.control} placeholder="Your Name" name="name" label="Name" />}
        <FormField control={form.control} placeholder="Your email address" type="email" name="email" label="Email" />
        <FormField control={form.control} placeholder="Enter your password" name="password" label="Password" type="password" />
        <Button className="btn" type="submit">{isSignIn ? "Sign in" : "Create an Account"}</Button>
      </form>
    </Form>
    <p className="text-center">
      {isSignIn ? "No Account Yet?" : "Have an Account Already?"}
      <Link href={!isSignIn ? "/signin" : "/signup "} className="font-bold text-user-primary ml-1">{!isSignIn ? "Sign in" : "Sign up"}</Link>
    </p>
    </div>
    </div>
  );
};

export default AuthForm;
