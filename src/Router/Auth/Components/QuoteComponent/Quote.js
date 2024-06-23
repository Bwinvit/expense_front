import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import _ from "lodash";

const QuoteComponent = styled.div`
  font-family: "Playwrite ES", cursive;
  font-size: 0.75rem;
  margin: 4rem;

  .quote_author {
    color: #af9583;
  }
`;

const Quote = () => {
  const { quote } = useSelector((state) => state.auth);

  const [quotePage, setQuotePage] = useState({
    quote: "",
    author: "",
  });

  useEffect(() => {
    if (!_.isEmpty(quote)) {
      handleRandomQuote();
    }
  }, [quote]);

  const handleRandomQuote = () => {
    const randomQuote = _.sample(quote);

    setQuotePage({
      quote: randomQuote.quote,
      author: randomQuote.author,
    });
  };

  return (
    <QuoteComponent>
      <p className="quote_text">"{quotePage.quote}"</p>
      <p className="quote_author">- {quotePage.author}</p>
    </QuoteComponent>
  );
};

export default Quote;
