import React, { useRef, useEffect } from "react";
import FlipPage from "react-flip-page";
import page1 from "../../assets/images/page1.png";
import page2 from "../../assets/images/page2.png";
import page3 from "../../assets/images/page3.png";

const pages = [page1, page2, page3];

export default function App() {
  const refBook = useRef();

  useEffect(() => {
    const handleKeyPress = (evt) => {
      switch (evt.which) {
        case 37:
          refBook.current.gotoPreviousPage();
          break;

        case 39:
          refBook.current.gotoNextPage();
          break;

        default:
          break;
      }
    };

    document.body.addEventListener("keydown", handleKeyPress);

    return () => {
      document.body.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="Book">
      <FlipPage
        ref={refBook}
        className="App-Book"
        orientation="horizontal"
        style={{ background: "transparent !important" }}
      >
        {pages.map((page, index) => (
          <article key={index}>
            <img
              style={{ width: "100%" }}
              src={page}
              alt={
                index === 0 ? "title" : `pages ${index * 2 - 1}-${index * 2}`
              }
            />
            
          </article>
        ))}
        
      </FlipPage>
    </div>
  );
}
