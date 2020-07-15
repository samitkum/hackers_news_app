import React from "react";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import "./search.scss";

const Search = (props) => {
  return (
    <div className="searchContainer">
      <Form>
        <FormControl
          type="text"
          placeholder="Search..."
          className="mr-sm-2"
          defaultValue={props.searchTerm}
          onKeyUp={props.onKeyUp}
        />
      </Form>
    </div>
  );
};

export default Search;
