"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Zap, Shield, Smartphone, Cpu } from "lucide-react";
import { QuizOption } from "@/components/quiz-option";
import { SubjectCard } from "@/components/subject-card";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      {/* Main Content */}
      <main className="mx-auto w-full max-w-full px-4 py-8 sm:px-6 md:max-w-2xl">
        {/* Hero Section */}
        <section className="space-y-6 text-center">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
              Mobile-First Experience
            </h2>
            <p className="text-base text-muted-foreground sm:text-lg">
              Beautiful, responsive design optimized for mobile users with
              seamless light and dark mode support
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700"
            >
              <Link href="/auth/signup">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-12 space-y-6">
          <h2 className="text-center text-2xl font-bold">Features</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Feature 1 */}
            <Card className="border border-border bg-card hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Mobile First</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Designed and built with mobile users in mind for optimal
                  performance and usability
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border border-border bg-card hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Built with Next.js 16 and optimized for speed with server
                  components and caching
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border border-border bg-card hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Secure & Safe</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Built on modern security best practices with TypeScript for
                  type safety
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border border-border bg-card hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Cpu className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-lg">Dark & Light Mode</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Seamless theme switching with persistent user preferences.
                  Press &apos;D&apos; to toggle!
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mt-12 rounded-lg border border-border bg-card/50 p-6 sm:p-8">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="space-y-2 text-center">
              <p className="text-2xl font-bold text-primary sm:text-3xl">
                99.9%
              </p>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
            <div className="space-y-2 text-center">
              <p className="text-2xl font-bold text-primary sm:text-3xl">
                {"<"}50ms
              </p>
              <p className="text-sm text-muted-foreground">Response Time</p>
            </div>
            <div className="space-y-2 text-center">
              <p className="text-2xl font-bold text-primary sm:text-3xl">∞</p>
              <p className="text-sm text-muted-foreground">Scalability</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-12 rounded-lg border border-border bg-gradient-to-br from-primary/10 to-primary/5 p-8 text-center space-y-4 sm:p-12">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground">
            Join thousands of mobile-first users enjoying a seamless experience
          </p>
          <Button size="lg" className="w-full sm:w-auto">
            Start Building Today
          </Button>
        </section>
      </main>
      {/* Subject Card */}

      <SubjectCard
        title="English Literature"
        progress={{ completed: 400, total: 100 }}
        percentage={19.53}
        subtopics={78}
        questions={12411}
        secondaryText="পড়া হয়েছে"
        onAllQuestions={() => console.log("All Questions clicked")}
        onAllSubtopics={() => console.log("All Subtopics clicked")}
        onRandomQuiz={() => console.log("Random Quiz clicked")}
        onFavorite={() => console.log("Favorite toggled")}
      />

      {/* Quiz Card */}
      <CardContent>
        <div className="space-y-3 sm:space-y-4">
          <QuizOption
            question={{
              id: 1284,
              question: '"Life is a tale told by an idiot" is quoted by-',
              options: [
                { label: "a", text: "Thomas Hardy" },
                { label: "b", text: "William Shakespeare" },
                { label: "c", text: "John Milton" },
                { label: "d", text: "Charles Lamb" },
              ],
              correctOptionId: "b",
              explanation:
                "This famous quote is from William Shakespeare's \"Macbeth\". It reflects the protagonist's view on the meaninglessness and chaos of human existence, spoken near the end of the tragedy.",
            }}
            onAnswer={(optionId) => console.log("Selected option:", optionId)}
          />
        </div>
      </CardContent>
      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16 py-8">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <p className="text-sm text-muted-foreground">
              © 2025 core-eb-fe. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
