import { Seo } from "@/components/layout/Seo";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="That page does not exist." />
      <section className="flex min-h-[70svh] items-center bg-ivory pt-[var(--header-h)]">
        <div className="container-x py-24">
          <p className="eyebrow text-olive-600">404</p>
          <h1 className="display-md mt-6">This path leads nowhere.</h1>
          <p className="lede mt-4 max-w-md text-charcoal/80">The page you were looking for has moved or never existed.</p>
          <div className="mt-10">
            <Button to="/" arrow="right">
              Back to Olive House
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
