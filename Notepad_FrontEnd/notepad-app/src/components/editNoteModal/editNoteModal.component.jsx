import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import EditPostForm from '../editPostForm/editPostForm.component';

const EditNoteModal = (props) => {
  const {
    buttonLabel,
    className,
    postData
  } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  
  return (
    <div>
      <Button color="info" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}></ModalHeader>
        <ModalBody>
            <EditPostForm postData={postData} toggle={toggle}/>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default EditNoteModal;
