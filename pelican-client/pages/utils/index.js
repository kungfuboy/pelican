export const changeTreeState = (tree, key) => {
    const [index, ..._arr] = key.toString().split('-')
    if(!_arr.length) {
        tree[index].expand = !tree[index].expand
    } else {
        tree[index].children = changeTreeState(tree[index].children, _arr.join('-'))
    }
    return tree
}