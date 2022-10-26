import React, { useCallback } from 'react';
import regexifyString from 'regexify-string';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';

const contentRegexifier = (content: string): (string | JSX.Element)[] | JSX.Element => {
  const result = regexifyString({
    pattern: /#[^\s#]+|@[^\s@]+|http[^\shttp]+|https:[^\shttps]+|\n/g,
    decorator(match, index) {
      const social: string[] | null = match.match(/http[^\shttp]+|https[^\shttps]+/g);

      if (social) {
        return (
          <a key={uuid()} href={social[0]} style={{ color: '#1974e4', textDecoration: 'underline' }}>
            {social[0]}
          </a>
        );
      }

      const arr: string[] | null = match.match(/#[^\s#]+|@[^\s@]+/g);
      if (arr) {
        return (
          <Link key={uuid()} to={`/results?search_query=${arr[0].slice(1)}`} style={{ color: '#1974e4' }}>
            {arr[0]}
          </Link>
        );
      }
      return <br key={uuid()} />;
    },
    input: content,
  });

  return result;
};

export default contentRegexifier;
