import React from 'react';

function EmbeddedPage(props) {
  return (
    <iframe
      title="Embedded Page"
      src={props.url}
      sx={{mx:'auto'}}
      width={props.width || "70%"}
      height={props.height || "600px"}
      frameBorder="0"
      allowFullScreen
    />
  );
}

export default EmbeddedPage;
