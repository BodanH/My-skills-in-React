import React from "react";
import MyInput from "./UI/Input/MyInput";
import MySelect from "./UI/select/MySelect";

const PostFilter = ({filter, setFilter}) => {
    return (
      <div>
        <MyInput
          value={filter.query}
                onChange={e => setFilter({ ...filter, query: e.target.value })}
          placeholder="find" />
        <MySelect
          value={filter.sort}
          onChange={selectedSort => setFilter({...filter, sort:selectedSort})}
          defaulValue="sorting"
          options={[{ value: "title", name: "name" },
            { value: "body", name: "description" }]}/>
      </div>
    )
}
export default PostFilter;