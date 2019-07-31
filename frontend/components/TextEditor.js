import React, { useState } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'
import 'draft-js/dist/Draft.css'
import PropTypes from 'prop-types'
// import { edit } from 'external-editor';

const TextEditor = (props) => {
  const initialEditorState = props.initialContentState
    ? props.initialContentState : EditorState.createEmpty()
  const [editorState, setEditorState] = useState(initialEditorState)

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      onChange(newState)
      return 'handled'
    }
    return 'not handled'
  }

  const onChange = (editorState) => {
    setEditorState(editorState)
    props.onChange(editorState)
  }

  return (
    <div>
      <Editor
        className="editor"
        editorState={editorState}
        onChange={onChange}
        handleKeyCommand={handleKeyCommand}/>
      <style jsx>{`
        .editor {
          height: 100px;
          width: 200px;
          border: 1px solid #eee;
        }
      `}</style>
    </div>
  )
}

TextEditor.propTypes = {
  initialContentState: PropTypes.any,
  onChange: PropTypes.func.isRequired
}

export default TextEditor
