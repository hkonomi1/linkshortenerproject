import { SignInButton, SignUpButton, Show } from "@clerk/nextjs";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link2, BarChart2, LayoutDashboard, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const features = [
  {
    icon: Link2,
    title: "Shorten Any URL",
    description:
      "Transform long, unwieldy links into short, clean URLs you can share anywhere in seconds.",
  },
  {
    icon: BarChart2,
    title: "Track Every Click",
    description:
      "See exactly how many times your links are clicked with real-time analytics and insights.",
  },
  {
    icon: LayoutDashboard,
    title: "Manage Your Links",
    description:
      "View, edit, and organize all your shortened links from one convenient dashboard.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Redirects happen in milliseconds so your audience never waits — powered by edge infrastructure.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col flex-1">
      {/* Hero */}
      <section className="flex flex-col flex-1 items-center justify-center gap-8 px-6 py-24 text-center">
        <div className="flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
          <Zap className="h-3.5 w-3.5" />
          Fast, reliable URL shortening
        </div>

        <h1 className="max-w-2xl text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          Shorten links.{" "}
          <span className="text-primary/80">Share smarter.</span>
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          Turn any long URL into a short, trackable link. Monitor clicks,
          manage your links, and share with confidence — all in one place.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Show when="signed-out">
            <SignUpButton mode="modal">
              <Button size="lg" className="min-w-36">
                Get Started Free
              </Button>
            </SignUpButton>
            <SignInButton mode="modal">
              <Button size="lg" variant="outline" className="min-w-36">
                Sign In
              </Button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <Link href="/dashboard" className={cn(buttonVariants({ size: "lg" }), "min-w-36")}>
              Go to Dashboard
            </Link>
          </Show>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-muted/30 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight text-foreground">
            Everything you need to manage your links
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className={cn(
                  "flex flex-col gap-4 rounded-xl border border-border bg-card p-6",
                  "transition-shadow hover:shadow-md"
                )}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-card-foreground">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} LinkShortener. All rights reserved.
      </footer>
    </div>
  );
}
