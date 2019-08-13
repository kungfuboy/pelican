import React from 'react'
import dynamic from 'next/dynamic'
import Tree from './components/Tree'
import axios from 'axios'
import NavMenu from './components/NavMenu'
import Prism from 'prismjs'
import './assets/app.less'
import './assets/code.less'
import { parseCode } from 'jabber-parse'
import circular from 'circular-json'
// import IconDelete from './icon/IconDelete/index.js'
import IconRun from './icon/IconRun/index.js'
import RenderTemplate from './components/RenderTemplate'
import Template from './components/Template'

// import tableTemlpate from './template/data.js'

const IconDelete = dynamic(import('./icon/IconDelete/index.js'), {
  ssr: false
})

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      list: [],
      code: '',
      menuIndex: 0,
      ast: '',
      path: '',
      activeDir: null,
      showModal: false // 是否显示弹窗
    }
  }
  getAllFile = () => {
    axios.get('http://127.0.0.1:3030/allPath').then(res => {
      this.setState({ list: res.data.data })
    })
  }
  updateFile = (path, data) => {
    console.log('data', data)
    const [html, js, style] = this.state.ast
    axios
      .post('http://127.0.0.1:3030/rewriteFile', {
        path,
        data: [JSON.parse(circular.stringify(data)), js, style]
      })
      .then(res => {
        this.setState({
          ast: parseCode(res.data.data),
          code: Prism.highlight(
            res.data.data,
            Prism.languages.javascript,
            'javascript'
          )
        })
      })
  }
  componentDidMount() {
    this.getAllFile()
  }
  handleAddFile = () => {
    // 如果当前选中的不是目录，则不响应
    if (this.state.activeDir == null) {
      return
    }
    // 弹出模板选择页
    this.setState({ showModal: true })
  }
  handleSubmit = ({ name, id }) => {
    // 关闭弹窗
    this.setState({ showModal: false })
    const path = this.state.activeDir
    axios
      .post(`http://127.0.0.1:3030/addFile`, {
        path,
        name,
        id
      })
      .then(res => {
        if (res.data.status === 200) {
          this.getAllFile()
        }
        // this.setState({ list: res.data.data })
      })
  }
  handleClickFile = (key, value, sign) => {
    if (!value) {
      throw new Error('不允许读取该文件')
    }
    this.setState({ path: value, activeDir: null })
    if (sign === 1) {
      return
    }
    axios
      .get(`http://127.0.0.1:3030/getFile?key=${key}&path=${value}`)
      .then(res => {
        // 获取数据
        this.setState(
          {
            ast: parseCode(res.data.data),
            code: Prism.highlight(
              res.data.data,
              Prism.languages.javascript,
              'javascript'
            )
          },
          () => {
            this.setState({ menuIndex: 0 })
            console.log(this.state.ast)
          }
        )
      })
  }
  changeMenuIndex = index => {
    this.setState({
      menuIndex: this.state.menuIndex === index ? 0 : index
    })
  }
  conditionRender(code) {
    if (code) {
      return <pre dangerouslySetInnerHTML={{ __html: code }} />
    }
    return <h3>You need to choose a file.</h3>
  }
  render() {
    return (
      <section className="app">
        <header className="shadow">Pelican</header>
        <NavMenu
          menuIndex={this.state.menuIndex}
          changeMenuIndex={this.changeMenuIndex}
        />
        <section className="content">
          <aside
            className={this.state.menuIndex === 1 ? 'tree active' : 'tree'}
          >
            <nav>
              <img src="./static/icon/refrash.svg" />
              <img
                className={
                  this.state.activeDir ? 'add-file' : 'add-file disable'
                }
                src="./static/icon/add.svg"
                onClick={() => this.handleAddFile(this.state.activeDir)}
              />
              <img src="./static/icon/edit.svg" />
              <IconRun />
              <IconDelete />
            </nav>
            <Tree
              data={this.state.list}
              clickFile={this.handleClickFile}
              clickDir={(key, value) => this.setState({ activeDir: value })}
            />
          </aside>
          <aside
            className={this.state.menuIndex === 2 ? 'code active' : 'code'}
          >
            {this.conditionRender(this.state.code)}
          </aside>
          <RenderTemplate
            data={this.state.ast[0]}
            updateFile={data => this.updateFile(this.state.path, data)}
          />
          {/* <EditTable
            data={this.state.ast[0]}
            updateFile={data => this.updateFile(this.state.path, data)}
          /> */}
        </section>
        {this.state.showModal ? (
          <Template handleSubmit={this.handleSubmit} />
        ) : (
          ''
        )}
      </section>
    )
  }
}
export default App
