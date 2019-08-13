import { useState, useEffect } from 'react'
import AttrList from './AttrList'
import '../../assets/editTable.less'
import recast from 'recast'

const EditTable = props => {
  const [ast, setAst] = useState({})
  const [activeKey, setActiveKey] = useState(-1)
  useEffect(() => {
    if (!props.data) {
      return
    }
    setAst(props.data)
  })
  const renderList = data => {
    if (!Object.keys(data).length) {
      return ''
    }
    // TODO render el-table
    return data.children.map((item, index) => (
      <div className="edit-table" key={index}>
        <span className="tag-name">
          第 {index + 1} 列 标签名：{item.tagName}
        </span>
        {/* <div className="thead"> */}
        <div className="table">
          <div className="thead">
            <div className="tr">
              <div className="td">属性名</div>
              <div className="td">属性值</div>
            </div>
          </div>
          <AttrList
            data={item.attrList}
            activeKey={activeKey}
            keys={index}
            changeActiveKey={key => setActiveKey(key)}
            updateAttr={(e, value) => updateAttr(e, value)}
            updateValue={(e, value) => updateValue(e, value)}
            inputBlur={handleBlur}
            inputEnterPress={handleEnterKey}
            handleDelete={position => handleDelete(ast, index, position)}
          />
        </div>
        <div className="tool">
          <img
            onClick={() => setAst(addAttribute(ast, index))}
            src="../../../static/icon/add.svg"
          />
        </div>
      </div>
    ))
  }
  const handleDelete = (ast, index, position) => {
    // console.log(position)
    setActiveKey(-1)
    setAst(deleteAttribute(ast, index, position))
    props.updateFile(ast)
  }
  const deleteAttribute = (ast, index, position) => {
    setActiveKey(-1)
    const _ast = Object.assign({}, ast)
    _ast.children[0].children[index].attrList.splice(position, 1)
    return _ast
  }
  const addAttribute = (ast, index) => {
    setActiveKey(-1)
    const _ast = Object.assign({}, ast)
    _ast.children[0].children[index].attrList.push({
      prop: '$$prop',
      value: '$$value'
    })
    return _ast
  }
  const handleBlur = () => {
    setActiveKey(-1)
    props.updateFile(ast)
  }
  const handleEnterKey = e => {
    if (e.nativeEvent.keyCode === 13) {
      setActiveKey(-1)
      props.updateFile(ast)
    }
  }
  const updateAttr = (value, key) => {
    const data = Object.assign({}, ast)
    const _arr = key.split('-')
    data.children[_arr[0]].attrList[_arr[1]].prop = value
    setAst(data)
  }
  const updateValue = (value, key) => {
    const data = Object.assign({}, ast)
    const _arr = key.split('-')
    data.children[_arr[0]].attrList[_arr[1]].value = value
    setAst(data)
  }
  return (
    <section className="edit-table-content">
      <ul>{renderList(ast)}</ul>
    </section>
  )
}
export default EditTable
