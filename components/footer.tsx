import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-4 py-8 md:px-12 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Links grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-5 md:mb-8 md:grid-cols-4 md:gap-8">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground md:mb-4">Navigate</h3>
            <ul className="space-y-1 md:space-y-2">
              <li>
                <Link href="#featured" className="text-sm text-muted-foreground hover:text-foreground">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-sm text-muted-foreground hover:text-foreground">
                  All Projects
                </Link>
              </li>
              <li>
                <Link href="#achievements" className="text-sm text-muted-foreground hover:text-foreground">
                  Achievements
                </Link>
              </li>
              <li>
                <Link href="#connect" className="text-sm text-muted-foreground hover:text-foreground">
                  Connect
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground md:mb-4">Tech Stack</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Python · SQL · Pandas · NumPy · Scikit-Learn · Apache Spark · AWS · Docker · Git
            </p>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground md:mb-4">Connect</h3>
            <ul className="space-y-1 md:space-y-2">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@nisarg.dev"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground md:mb-4">Legal</h3>
            <ul className="space-y-1 md:space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Closing identity area */}
        <div className="mt-6 border-t border-border pt-6 md:mt-8 md:pt-8">
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-primary">N</span>
              <span className="text-sm font-semibold text-foreground">
                Nisarg Shah
              </span>
              <span className="text-sm text-muted-foreground">· Data Scientist</span>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:hello@nisarg.dev"
                className="text-muted-foreground hover:text-foreground"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Nisarg. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}