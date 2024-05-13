import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#3b82f6",
          },
        }}
      />
    </div>
  );
};

export default SignInPage;
