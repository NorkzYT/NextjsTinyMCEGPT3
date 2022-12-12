import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState, useRef, useEffect } from "react";
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react";

export default function Home() {
  const [data, setData] = useState({ text: "" });
  const [query, setQuery] = useState();
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const TinyMCE = () => {
    const editorRef = useRef(null);
    const log = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    };

    const data = "TE";
    function openai_content(editor) {
      editorRef.current = editor;
      editor.setContent("<p>Hello world!</p>");
    }
    return (
      <>
        <TinyMCEEditor
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          onInit={(evt, editor) => {
            editorRef.current = editor;
          }}
          initialValue={openai_content}
          id="TextEditor"
          onChange={log}
          init={{
            selector: "textarea",
            setup: (editor) => {
              editorRef.current = editor;
            },
            statusbar: false,
            resize: false,
            toolbar_sticky: true,
            menubar: true,
            branding: false,
            promotion: false,
            icons: "default",
            autosave_interval: "10s",
            //autosave_retention: '30m',
            autosave_restore_when_empty: true,
            autosave_ask_before_unload: true,
            height: 906,
            width: 1537,
            //autoresize_bottom_margin: 900,
            //autoresize_top_margin: 330,
            //autoresize_overflow_padding: 50,
            autosave_prefix: "tinymce-autosave-{path}{query}-{id}-",
            plugins: [
              "advlist",
              "autolink",
              "autosave",
              "lists",
              "link",
              "image",
              "charmap",
              //'powerpaste',
              //'casechange',
              //'lists advlist',
              "emoticons",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "code",
              "codesample",
              "directionality",
              "media",
              "table",
              "preview",
              "help",
              "wordcount",
              "insertdatetime",
              "nonbreaking",
              "pagebreak",
              "quickbars",
              "save",
              "template",
              "visualchars",
              "help",
            ],
            toolbar:
              "restoredraft undo redo print spellcheckdialog formatpainter | blocks fontfamily fontsize |" +
              "bold italic underline forecolor backcolor | link image addcomment showcomments  |" +
              "alignleft aligncenter alignright alignjustify lineheight | checklist bullist numlist indent outdent |" +
              "removeformat | help",
            placeholder:
              "Edit the generated or copied text here\n\n" +
              "Time is of the essence. The more you write, the more you will get back.",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        {/* <button onClick={log}>Log editor content</button> */}
      </>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        setIsLoading(true);
        const res = await fetch(`/api/openai`, {
          body: JSON.stringify({
            name: search,
          }),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        const data = await res.json();
        setData(data);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Nextjs GPT-3 App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          <a>AI Lyrics Generator</a>
        </h1>

        <p className={styles.description}>Built with NextJS & GPT-3 API</p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>Enter Artist:</h3>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="button" onClick={() => setSearch(query)}>
              Generate
            </button>

            <h4>Lyrics</h4>
            {isLoading ? <div>Loading ...</div> : <span>{data.text}</span>}
          </div>
        </div>
      </main>
      <TinyMCE />
    </div>
  );
}
