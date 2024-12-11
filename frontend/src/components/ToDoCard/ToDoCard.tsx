import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Button, Checkbox } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import styled from 'styled-components';
import { FaEdit, FaTrash, FaRegCalendarAlt  } from "react-icons/fa";
import todoCardImg1 from "../../assets/card1.png"
import todoCardImg2 from "../../assets/card2.png"
import { AlignItems, SpaceBetween } from '../StyledComponent/user';
import importantImg from '../../assets/important.png'

const CardContainer = styled(Tilt)`
  max-width: 300px;
  width: 100%;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 20px 20px 20px 10px rgba(0, 0, 0, 0.5);
  margin-top: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
`;

const Title = styled.i`
  color: var(--text-color);
  font-weight: bold;
  font-size: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const EditIcon = styled(FaEdit)`
  color: #f4aef4;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #d385d3; /* Darker color on hover */
  }
`;

const TrashIcon = styled(FaTrash)`
  color: lightblue;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #4c8bf5; /* Darker blue on hover */
  }
`;

const Description = styled.p`
  margin-top: 8px;
  color: var(--text-color);
  font-size: 14px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DemoLinkWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DemoLink = styled.button`
  background-color: var(--tab-bar-color);
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: center;
  cursor: pointer;
  border: none;
`;

const ToDoCard = ({ title, important, uuid, duedate, description, index, handleEdit, handleRemove, completed, handleCompleted }: any) => {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheck = async (uuid:string ) => {
    await setChecked(!checked)
    handleCompleted(uuid, !checked)
  }

  return(
    <CardContainer>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 100 },
          show: { opacity: 1, y: 0, transition: { type: 'spring', delay: index * 0.5, duration: 1 } },
        }}
      >
        <Image src={important ? todoCardImg1 : todoCardImg2} alt={title} />
        <SpaceBetween>
          {
            completed ? 
            <div></div> 
            : 
            <Checkbox
            name="completed"
            style={{ color: "var(--text-color)" }}
            onChange={() => handleCheck(uuid)}
          />
          }
          <AlignItems>
            <EditIcon onClick={() => handleEdit(uuid)} />
            <TrashIcon onClick={() =>handleRemove(uuid)} />
          </AlignItems>
        </SpaceBetween>
        <AlignItems style={{marginTop: '12px'}}>
          <FaRegCalendarAlt style={{color: 'var(--text-color)'}} />
          <p style={{fontSize: '12px', color: 'var(--text-color)'}}>{duedate}</p>
        </AlignItems>
        <div style={{ height: "100px" }}>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </div>
        <DemoLinkWrapper>
          <DemoLink onClick={handleClickOpen}>
            More Detail...
          </DemoLink>
        </DemoLinkWrapper>
      </motion.div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiDialog-paper': {
            backgroundColor: 'var(--background-color)',
            padding: "20px",
            width: "500px"
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" style={{fontSize: "25px", fontWeight: "bold", color: "var(--text-color)", display: 'flex', alignItems: "center", justifyContent: "space-between"}}>
          {title}
          {important && <img src={importantImg} alt='important' style={{width: "30px", height: "30px", borderRadius: '50%'}} />}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"  style={{color: "var(--text-color)"}}>
            Due Date: &nbsp;
            <i>{duedate}</i>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description" style={{color: "var(--text-color)", marginTop: "10px"}}>
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{color: "var(--text-color)"}} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </CardContainer>
  )
}

export default ToDoCard