import React, { useState } from 'react';
import './createNoteModal.styles.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
        Form, FormGroup, Label, Input, } from 'reactstrap';

const CreateNoteModal = (props) => {
  const {
    buttonLabel,
    className
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
                    {/* <Label for="exampleText">My Notes</Label> */}
                    <Input type="textarea" name="text" id="exampleText" />
                </FormGroup>
            </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>Create</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default CreateNoteModal;