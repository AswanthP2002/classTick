import { useContext, useEffect, useState } from "react"
import { StudentContext } from "./StudentContext"
import insertStudent from "../services/addStudent"
import Swal from "sweetalert2"
import updateStudent from "../services/editStudent"
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material"
import {IoMdCloseCircle} from 'react-icons/io'
import { Controller, useForm } from "react-hook-form"
export default function ActionModal({ modalStatus, onAddStudent, onUpdateStudent, closeModal, isEdit = false, editData = null }) {

    const {GeneiAlert} = useContext(StudentContext)
    const {handleSubmit, watch, control, formState:{errors}, reset} = useForm()
    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [status, setStatus] = useState('')
    const [statusError, setStatusError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(isEdit && editData){
            setName(editData.name)
            reset({
                name:editData.name,
                status:editData.status
            })
            setStatus(editData.status)
        }
    }, [editData, isEdit])

    async function addStudent(data){
        setLoading(true)
       const {name, status} = data
        try {
            const insertedStudentId = await insertStudent(name, status)
            
            if(insertedStudentId){
                
                closeModal()
                Swal.fire({
                    icon:'success',
                    title:'Added',
                    showConfirmButton:false,
                    showCancelButton:false,
                    allowOutsideClick:false,
                    allowEscapeKey:false,
                    timer:1500
                }).then(() => onAddStudent(name, status))
            }
        } catch (error) {
            closeModal()
            Swal.fire({
                icon:'error',
                title:'Error',
                text:error?.message,
                allowOutsideClick:false,
                allowEscapeKey:false
            })
        } finally {
            setLoading(false)
        }

        
    }

    async function updateCurrentStudent(data){
        setLoading(true)
        const {name, status} = data
        try {
            await updateStudent(editData.id, {name, status})
            Swal.fire({
                icon:'success',
                title:'Updated',
                showConfirmButton:false,
                showCancelButton:true,
                timer:2000
            }).then(() => onUpdateStudent(editData.id, name, status))
        } catch (error) {
            // console.log(error)
            Swal.fire({
                icon:'error',
                title:'Error',
                text:error?.message
            })
        } finally {
            setLoading(false)
        }
    }  

    async function handleFormSubmission(data){
        if(isEdit){
            updateCurrentStudent(data)
        }else{
            addStudent(data)
        }
    }

    return (
        <>
        <Modal open={modalStatus} onClose={closeModal} className="flex justify-center items-center">
            <div className="bg-white rounded-md !p-5 w-md">
                <div className="header flex justify-end">
                    <IoMdCloseCircle className="cursor-pointer" size={23} onClick={closeModal} />
                </div>
                <div className="body">
                    <p className="text-center !my-5 font-semibold text-xl">
                        {isEdit ? 'Update Student' : 'Add Student'}
                    </p>
                    <form onSubmit={handleSubmit(handleFormSubmission)}>
                        <FormControl fullWidth>
                            <Controller 
                                name="name"
                                control={control}
                                rules={{
                                    required:{value:true, message:'Name can not be empty'},
                                    min:{value:3, message:'Minimu 3 charecters'},
                                    max:{value:30, message:'Maximum 30 charecters'}
                                }}
                                render={({field}) => (
                                    <TextField
                                        {...field}
                                        variant="outlined"
                                        label="Student Name"
                                        error={Boolean(errors.name)}
                                        helperText={errors.name?.message}
                                    />
                                )}
                            />
                        </FormControl>

                        <FormControl error={Boolean(errors.status)} fullWidth className="!mt-10">
                            <InputLabel id="status-label">Status</InputLabel>
                            <Controller 
                                name="status"
                                control={control}
                                rules={{
                                    required:{value:true, message:'Status can not be empty'}
                                }}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        variant="outlined"
                                        label="Status"
                                        labelId="status-label"
                                        error={Boolean(errors.status)}
                                    >
                                        <MenuItem value="Active">Active</MenuItem>
                                        <MenuItem value="Refreshment">Refreshment</MenuItem>
                                        <MenuItem value="Suspended">Suspended</MenuItem>
                                        <MenuItem value="Break">On Break</MenuItem>
                                        <MenuItem value="Cool-Off">Cool-Off</MenuItem>
                                    </Select>
                                )}
                            />
                            <FormHelperText>{errors.status?.message}</FormHelperText>
                        </FormControl>
                        <div>
                            {
                                isEdit
                                    ? <Button type="submit" variant="contained" className="!mt-5" fullWidth loading={loading}>Update Student</Button>
                                    : <Button type="submit" variant="contained" className="!mt-5" fullWidth loading={loading}>Add Student</Button>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
        </>
    )
}