import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <SignUp
        appearance={{
          variables: {
            colorPrimary: "#3b82f6",
          },
        }}
      />
    </div>
  );
};

export default SignUpPage;
