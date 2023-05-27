import React from "react";
import ReactDOM from "react-dom";
import { map, includes, sortBy, uniqBy, each, result, get } from "lodash";
import data from "./data";

import { Select, Input, Table, Button, Icon } from "antd";
const Search = Input.Search;
const Option = Select.Option;

class App extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
    data,
    filtered: false,
    searchText: ""
  };
  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    });
  };
  handleFilter = (value, option) => {
    console.log(value);
    this.setState({
      data: map(data, record => {
        const filterMatch = includes(record.fieldtext, value);
        if (!filterMatch) {
          return null;
        }
        return record;
      }).filter(record => !!record)
    });
  };
  getAdvancedFilters(filterKey) {
    let Filters = [];
    let title = sortBy(this.state.data, filterKey);
    title = uniqBy(title, filterKey);

    each(title, e => {
      const filter = result(e, filterKey);
      Filters.push(<Option key={filter}>{filter}</Option>);
    });
    return Filters;
  }
  clearAll = () => {
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
      data: data,
      searchText: "",
      filtered: null
    });
  };
  emitEmpty = () => {
    this.setState({
      data: data,
      searchText: "",
      filtered: null
    });
  };
  onInputChange = e => {
    this.setState({ searchText: e.target.value });
  };
  onSearch = e => {
    const reg = new RegExp(e.target.value, "gi");
    const filteredData = map(data, record => {
      const nameMatch = get(record, "fieldtext.name").match(reg);
      const addressMatch = get(record, "fieldtext.address").match(reg);
      if (!nameMatch && !addressMatch) {
        return null;
      }
      return record;
    }).filter(record => !!record);

    this.setState({
      searchText: e.target.value,
      filtered: !!e.target.value,
      data: e.target.value ? filteredData : data
    });
  };
  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [
      {
        title: "Name",
        dataIndex: "fieldtext.name",
        key: "name",
        filters: [{ text: "Joe", value: "Joe" }, { text: "Jim", value: "Jim" }],
        filteredValue: filteredInfo.name || null,
        onFilter: (value, record) => record.fieldtext.name.includes(value),
        sorter: (a, b) => (a.name > b.name ? 1 : -1),
        sortOrder: sortedInfo.columnKey === "name" && sortedInfo.order
      },
      {
        title: "Age",
        dataIndex: "fieldtext.age",
        key: "age",
        sorter: (a, b) => a.age - b.age,
        sortOrder: sortedInfo.columnKey === "age" && sortedInfo.order
      },
      {
        title: "Address",
        dataIndex: "fieldtext.address",
        key: "address",
        filters: [
          { text: "London", value: "London" },
          { text: "New York", value: "New York" }
        ],
        filteredValue: filteredInfo.address || null,
        onFilter: (value, record) => record.fieldtext.address.includes(value),
        sorter: (a, b) => a.address.length - b.address.length,
        sortOrder: sortedInfo.columnKey === "address" && sortedInfo.order
      }
    ];
    const docStatus = this.getAdvancedFilters("fieldtext.name");
    const docAddress = this.getAdvancedFilters("fieldtext.x");

    const { searchText } = this.state;
    const suffix = searchText ? (
      <Icon type="close-circle" onClick={this.emitEmpty} />
    ) : null;
    return (
      <div>
        <div className="table-operations">
          <Search
            size="large"
            ref={ele => (this.searchText = ele)}
            suffix={suffix}
            onChange={this.onSearch}
            placeholder="Search Records"
            value={this.state.searchText}
            onPressEnter={this.onSearch}
          />

          <Button onClick={this.clearAll}>Clear all</Button>
          <Select
            notFoundContent={"Not found?!"}
            onChange={this.handleFilter}
            defaultValue={"Document Status"}
          >
            {docStatus}
          </Select>
          <Select
            onChange={this.handleFilter}
            showSearch
            placeholder={"Address"}
            defaultValue={"Document Address"}
          >
            {docAddress}
          </Select>
        </div>
        <Table
          columns={columns}
          dataSource={this.state.data}
          rowKey={record => record.fieldtext.key}
          onChange={this.handleChange}
          size="small"
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

//https://codesandbox.io/s/antd-table-search-2pnuz?from-embed=&file=/data.js
