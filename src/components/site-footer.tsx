import { ShopWaveLogo } from "./icons";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <ShopWaveLogo className="w-6 h-6 text-primary" />
            <p className="text-center text-sm leading-loose md:text-left">
              <span className="font-semibold">ShopWave</span>
              . The new wave of online shopping.
            </p>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ShopWave, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
