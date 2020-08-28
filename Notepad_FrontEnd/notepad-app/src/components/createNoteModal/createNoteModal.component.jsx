import React, { useState } from 'react';
import './createNoteModal.styles.scss';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
        Form, FormGroup, Input, } from 'reactstrap';

const CreateNoteModal = (props) => {
  const {
    className,
    onChange,
    handleSubmit
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className='CreateNoteModal'>
      <span className='plus-icon' onClick={toggle} role='img' aria-label='plus'>
        &#10133; Create New Note
      </span>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Write Your Note Here</ModalHeader>
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