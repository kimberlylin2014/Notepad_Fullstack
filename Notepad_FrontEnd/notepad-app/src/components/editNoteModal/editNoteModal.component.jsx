import React, { useState } from 'react';
import './editNoteModal.styles.scss';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import EditPostForm from '../editPostForm/editPostForm.component';

const EditNoteModal = (props) => {
  const {
    className,
    postData
  } = props;

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  
  return (
    <div className='EditNoteModal'>
      <span onClick={toggle} className='edit-icon' role='img' aria-label='edit'>
        &#9998;
      </span>
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
