import React, { useState } from 'react';
import './createNoteModal.styles.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
        Form, FormGroup, Input, } from 'reactstrap';

const CreateNoteModal = (props) => {
  const {
    buttonLabel,
    className,
    onChange,
    handleSubmit
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className='CreateNoteModal'>
      <Button color="warning" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>My Notes</ModalHeader>
        <ModalBody>
            <Form>             
                <FormGroup>
                    <Input type="textarea" name="postText" id="exampleText" onChange={onChange}/>
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => {
              toggle();
              handleSubmit();
          }}>Create</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CreateNoteModal;