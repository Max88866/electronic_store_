import React, {useEffect, useRef, useState} from "react";
import "./addZone.css";
import Select from "../../../utils/select/Select";
import Button from "../../../utils/button/Button";
import Input from "../../../utils/input/Input";
import {useDispatch, useSelector} from "react-redux";
import {
    addBrand,
    addDevice,
    addDeviceType, addProperty, deleteBrand,
    deleteDeviceType, getAllDevices,
    setBrands,
    setDevices,
    getDeviceTypes
} from "../../../actions/device";

const AddZone = (props) => {

    //property
    const propertyDeviceTypeRef = useRef()
    const propertyBrandRef = useRef()
    const propertyDeviceRef = useRef()
    const propertyNameRef = useRef()
    const propertyDescRef = useRef()
    const [propertyBrands, setPropertyBrands] = useState([])
    const [propertyDevices, setPropertyDevices] = useState([])


    const deviceSelectRef = useRef()
    const deviceTypeSelectRef = useRef()
    const newDeviceTypeSelectRef = useRef()
    const newDeviceBrandSelectRef = useRef()

    const deviceTypeInputRef = useRef()
    const newDeviceInputRef = useRef()
    const brandInputRef = useRef()
    const priceInputRef = useRef()
    const fileInputRef = useRef()
    const descriptionInputRef = useRef()

    const dispatch = useDispatch()

    const deviceTypes = useSelector(state => state.deviceReducer.deviceTypes)
    const brands = useSelector(state => state.deviceReducer.brands)
    const devices = useSelector(state => state.deviceReducer.devices)
    const [newDeviceBrands, setNewDeviceBrands] = useState([])

    useEffect(()=> {
        dispatch(getDeviceTypes())
        dispatch(setBrands())
        dispatch(getAllDevices())
    },[])

    function addBrandClick() {
        dispatch(addBrand(brandInputRef.current.value,
            deviceTypeSelectRef.current.options[deviceTypeSelectRef.current.selectedIndex].innerText))
    }

    function addDeviceClick() {
        const device = {
            name: newDeviceInputRef.current.value,
            price: priceInputRef.current.value,
            brandName: newDeviceBrandSelectRef.current.options[newDeviceBrandSelectRef.current.selectedIndex].innerText,
            typeName: newDeviceTypeSelectRef.current.options[newDeviceTypeSelectRef.current.selectedIndex].innerText,
            description: descriptionInputRef.current.value,
            file: fileInputRef.current.files[0] }
        dispatch(addDevice(device))
    }

    function changeNewDeviceBrand() {
        setNewDeviceBrands(brands.filter(brand => brand.deviceTypeName == newDeviceTypeSelectRef.current.options[newDeviceTypeSelectRef.current.selectedIndex].innerText))
    }

    function changePropertyBrands() {
        setPropertyBrands(brands.filter(brand => brand.deviceTypeName == propertyDeviceTypeRef.current.options[propertyDeviceTypeRef.current.selectedIndex].innerText))
    }

    function changePropertyDevices() {
        setPropertyDevices(devices.filter(device => device.brandName == propertyBrandRef.current.options[propertyBrandRef.current.selectedIndex].innerText))
    }

    function deleteBrandClick() {
        dispatch(deleteBrand(brandInputRef.current.value,
            deviceTypeSelectRef.current.options[deviceTypeSelectRef.current.selectedIndex].innerText))
    }

    function deleteBrandClick() {
        dispatch(deleteBrand(brandInputRef.current.value,
            deviceTypeSelectRef.current.options[deviceTypeSelectRef.current.selectedIndex].innerText))
    }

    function addPropertyClick() {
        addProperty(propertyDeviceTypeRef.current.options[propertyDeviceTypeRef .current.selectedIndex].innerText,
            propertyBrandRef.current.options[propertyBrandRef .current.selectedIndex].innerText,
            propertyDeviceRef.current.options[propertyDeviceRef .current.selectedIndex].innerText,
            propertyNameRef.current.value,
            propertyDescRef.current.value)
    }

    return (
        <div className="addzone">
            <div className="addzone-header">?????????? ?????? ????????????????????</div>
            <div className="addzone-type">
                <Input reference={deviceTypeInputRef} placeholder="?????????????? ?????????? ?????? ????????????????????..." width="100%" margin="10px"/>
                <div>
                    <Button click={()=>dispatch(deleteDeviceType(deviceTypeInputRef.current.value))} text="??????????????"/>
                    <Button click={()=>dispatch(addDeviceType(deviceTypeInputRef.current.value))} text="????????????????"/>
                </div>
            </div>


            <div className="addzone-header">?????????? ??????????</div>
            <div className="addzone-brand">
                <Select reference={deviceTypeSelectRef} list={deviceTypes}/>
                <Input id="input" reference={brandInputRef} placeholder="?????????????? ?????????? ??????????..." width="100%" margin="10px"/>
                <div>
                    <Button click={deleteBrandClick}  text="??????????????"/>
                    <Button click={addBrandClick}  text="????????????????"/>
                </div>
            </div>

            <div className="addzone-header">?????????? ????????????????????</div>
            <div className="addzone-device">
                <Select onchange={changeNewDeviceBrand} reference={newDeviceTypeSelectRef} list={deviceTypes}/>
                <Select reference={newDeviceBrandSelectRef}
                        list={newDeviceBrands}/>
                <Input reference={newDeviceInputRef} placeholder="?????????????? ???????????????? ????????????????????..." width="100%" margin="10px"/>
                <div className="addzone-device-inputs">
                    <Input reference={priceInputRef} placeholder="?????????????? ????????..." width="49%" margin="10px"/>
                    <Input reference={fileInputRef} placeholder="???????????????? ????????" type="file" width="49%" margin="10px"/>
                </div>
                <textarea ref={descriptionInputRef} placeholder="???????????????? ????????????..."/>
                <div>
                    <Button click={addDeviceClick} text="??????????????"/>
                    <Button click={addDeviceClick} text="????????????????"/>
                </div>
            </div>

            <div className="addzone-header">?????????? c??????????????</div>
            <div className="addzone-properties">
                <Select  onchange={()=>changePropertyBrands()} reference={propertyDeviceTypeRef} list={deviceTypes}/>
                <Select onchange={()=>changePropertyDevices()} reference={propertyBrandRef} list={propertyBrands}/>
                <Select reference={propertyDeviceRef} list={propertyDevices}/>
                <div className="addzone-device-inputs">
                    <Input reference={propertyNameRef} placeholder="????????????????..." width="49%" margin="10px"/>
                    <Input reference={propertyDescRef} placeholder="????????????????..." width="49%" margin="10px"/>
                </div>
                <Button click={()=>addPropertyClick()}  text="????????????????"/>
            </div>
        </div>
    )
}

export default AddZone;