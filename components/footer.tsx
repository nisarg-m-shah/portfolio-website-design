import Link from "next/link"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-4 py-12 md:px-12 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Links grid */}
        <div className="mb-8 grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Navigate</h3>
            <ul className="space-y-2">
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
                <Link href="#blogs" className="text-sm text-muted-foreground hover:text-foreground">
                  Blog
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
            <h3 className="mb-4 text-sm font-semibold text-foreground">Tech Stack</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">React / Next.js</li>
              <li className="text-sm text-muted-foreground">TypeScript</li>
              <li className="text-sm text-muted-foreground">Node.js</li>
              <li className="text-sm text-muted-foreground">PostgreSQL</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">Connect</h3>
            <ul className="space-y-2">
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
            <h3 className="mb-4 text-sm font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2">
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

        {/* Bottom section */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">N</span>
            <span className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Nisarg. All rights reserved.
            </span>
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
      </div>
    </footer>
  )
}
