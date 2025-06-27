interface IRootLayout extends Readonly<{ children: React.ReactNode }> {}

export default async function RootLayout({ children }: IRootLayout) {
  return <>{children}</>;
}
