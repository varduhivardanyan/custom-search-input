import React, { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedOptions } from './actions/actionCreators';
import { Layout, Modal, Input, Checkbox, Tag, PageHeader, Empty } from 'antd';
import { options } from './constants';
import 'antd/dist/antd.css';
import './App.css';

const { Content } = Layout;

let timer = null;

/* Component from scratch */
const App = memo(() => {
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const [showDropDown, setShowDropDown] = useState(false);
	const selectedOptions = useSelector((state) => state.dropDown.selectedOptions);
	const [filteredOptions, setFilteredOptions] = useState([]);
	const [empty, setEmpty] = useState(false);

	const handleClose = () => {
		setShowModal(false);
	};

	const handleOutSideClick = (e) => {
		const dropDownElement = document.getElementById("dropdown");

		if (!(dropDownElement && dropDownElement.contains(e.target))) {
			setShowDropDown(false);
		}
	};

	useEffect(() => {
		window.addEventListener('click', handleOutSideClick);
		return () => window.removeEventListener('click', handleOutSideClick);
	}, []);

	useEffect(() => {
		if (!selectedOptions.length) return;

		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => setShowModal(true), 5000);

		return () => clearTimeout(timer);

	}, [selectedOptions.length]);

	const onInputFocus = () => {
		setShowDropDown(true);
	};

	const handleInputChange = (e) => {
		if (!e.target.value) {
			setEmpty(false);
			return setFilteredOptions([])
		}

		if (timer) clearTimeout(timer);

		const value = e.target.value.toLowerCase();
		const filtered = options.filter((opt) => opt.value.includes(value) && opt );
		if (!filtered.length) {
			return setEmpty(true);
		}
		setEmpty(false);
		setFilteredOptions(filtered);
	};

	const removeChecked = (option) => {
		const options = selectedOptions.filter((opt) => opt !== option);
		dispatch(setSelectedOptions(options));
	};

	const getItemList = () => {
		if (!showDropDown) {
			return null;
		}

		if (empty) {
			return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
		}

		return dropDownOptions.map((option) => (
			<Checkbox
				key={option.value}
				value={option.value}
				checked={selectedOptions.includes(option.value.toLowerCase())}
				onChange={handleCheckBoxChange}>
				{option.label}
			</Checkbox>
		));
	};

	const getTagsList = () => {
		if (!selectedOptions.length) {
			return null;
		}

		return selectedOptions.map((option) => (
			<Tag key={option} closable onClose={() => removeChecked(option)}>
				{option}
			</Tag>
		));
	};

	const handleCheckBoxChange = (e) => {
		const event = e.target;
		if (event.checked) {
			return dispatch(setSelectedOptions([...selectedOptions, event.value]));
		}
		removeChecked(event.value);
	};

	const dropDownOptions = filteredOptions.length ? filteredOptions : options;

	return (
		<Layout>
			<PageHeader title="Input Search"/>
			<Content>
				<div id="dropdown" className="dropDownWrapper">
					<div className="tagsContainer">{getTagsList()}</div>
					<Input onChange={handleInputChange} onFocus={onInputFocus} placeholder="Input Search"/>
					<div className="dropDownContent">{getItemList()}</div>
				</div>
				<Modal
					title="Show Selected Options"
					visible={showModal}
					onCancel={handleClose}
					footer={false}
				>
					<p>{selectedOptions.join(' ')}</p>
				</Modal>
			</Content>
		</Layout>
	);
});

export default App;
