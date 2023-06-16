import RootLayout from "@/components/layout";
import "@/styles/globals.css";
import "@/styles/sidebar.css";
import "@/styles/dashboard.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import NextNProgress from "nextjs-progressbar";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
  }, []);

  return (
    <RootLayout>
      <NextNProgress />
      <Component {...pageProps} />
    </RootLayout>
  );
}
