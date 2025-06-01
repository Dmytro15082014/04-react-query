import styles from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, Field, type FormikHelpers } from "formik";
import * as Yup from "yup";

interface SearchBarProp {
  onSubmit: (text: string) => void;
}

interface OrderFormValue {
  query: string;
}

const initialValues: OrderFormValue = {
  query: "",
};
const Schema = Yup.object().shape({
  query: Yup.string().trim(),
});

export default function SearchBar({ onSubmit }: SearchBarProp) {
  const handleSubmit = (
    { query }: OrderFormValue,
    actions: FormikHelpers<OrderFormValue>
  ) => {
    if (query.trim().length) {
      onSubmit(query.trim());
    } else {
      toast.error("Please enter your search query.");
    }
    actions.resetForm();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={Schema}
        >
          <Form className={styles.form}>
            <Field
              className={styles.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
            />
            <button className={styles.button} type="submit">
              Search
            </button>
          </Form>
        </Formik>
      </div>
      <Toaster />
    </header>
  );
}
