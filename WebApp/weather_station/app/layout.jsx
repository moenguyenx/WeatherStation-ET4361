
export const metadata = {
  title: "Weather Station",
  description: "Code lỏ by Moenguyenx",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  );
}
