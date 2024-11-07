import { Button } from "@/ui/button";
import GithubIcon from "../icons/github";

export default function Hero() {
  return (
    <section className="relative flex w-full flex-col items-center justify-start px-4 pt-32 sm:px-6 sm:pt-24 md:pt-32 lg:px-8">
      <div className="flex flex-col items-center text-center space-y-6">
        <h1 className="text-5xl font-bold my-4 max-w-xl">
          Take Control of Your Links Like a Pro
        </h1>
        <p className="text-base max-w-xl">
          Slash is an open-source project by SDilone designed to provide an efficient solution for managing and sharing short links. With its fast, secure, and user-friendly interface, Slash makes link management simpler than ever.
        </p>
        <div className="flex flex-row justify-center gap-4 items-center">
          <Button size="lg">
            Get started
          </Button>
          <Button variant="outline" size="lg">
            <GithubIcon />
            Source code
          </Button>
        </div>
      </div>
    </section>

  )
}