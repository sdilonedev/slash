import LoginButton from "@/components/auth/login-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/card";

export default function AuthLoginPage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex items-center justify-center text-center">
        <CardTitle className="text-2xl font-medium duration-500 animate-in fade-in-20">
          Log in
        </CardTitle>
        <CardDescription className="duration-500 animate-in fade-in-30">
          Log in with your Github or Google account:
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 duration-500 animate-in fade-in-30">
        <LoginButton />
      </CardContent>
    </Card>
  );
};