// SPDX-FileCopyrightText: © 2024 Carl Ansell <github@carlansell.co.uk>
// SPDX-License-Identifier: GPL-3.0-or-later

const { registerBlockType } = wp.blocks;
const { useBlockProps } = wp.blockEditor;
const {
	TextControl,
	SelectControl,
	Button,
	CheckboxControl,
	Flex,
	FlexItem,
	GradientPicker,
} = wp.components;
const { useState } = wp.element;
const { __ } = wp.i18n;

import './editor.scss';
import './style.scss';
import metadata from './block.json';

const Edit = ( { attributes, setAttributes } ) => {
	const { donations, logoDisplay, donateText } = attributes;
	const [ newUrlType, setNewUrlType ] = useState( '' );
	const [ newUrlText, setNewUrlText ] = useState( '' );
	const [ newUrl, setNewUrl ] = useState( '' );

	const addDonation = () => {
		if ( newUrlType && newUrl ) {
			const newDonation = {
				type: newUrlType,
				text: newUrlText,
				url: newUrl,
			};
			setAttributes( { donations: [ ...donations, newDonation ] } );
			setNewUrlType( '' );
			setNewUrlText( '' );
			setNewUrl( '' );
		}
	};

	const deleteDonation = ( index ) => {
		const updatedDonations = donations.filter(
			( _, idx ) => idx !== index
		);
		setAttributes( { donations: updatedDonations } );
	};

	const toggleLogoDisplay = () => {
		setAttributes( { logoDisplay: ! logoDisplay } );
	};

	return (
		<div className="donate-box" { ...useBlockProps() }>
			<div>
				<div className="labels">
					{ __( 'Background colour', 'qb-donate' ) }
				</div>
				<GradientPicker
					value={ attributes.background }
					onChange={ ( value ) =>
						setAttributes( { background: value } )
					}
				/>
			</div>
			<div>
				<TextControl
					label={ __( 'Donate prompt text', 'qb-donate' ) }
					value={ donateText }
					onChange={ ( value ) =>
						setAttributes( { donateText: value } )
					}
				/>
			</div>
			<div>
				<CheckboxControl
					label={ __(
						'Show site logo above donate links',
						'qb-donate'
					) }
					checked={ logoDisplay }
					onChange={ toggleLogoDisplay }
				/>
			</div>
			<div className="donate-link-add">
				<SelectControl
					label={ __( 'Donation Link Type', 'qb-donate' ) }
					value={ newUrlType }
					options={ [
						{ label: 'Select Donation Type', value: '' },
						{
							label: 'Buy Me a Coffee',
							value: 'Buy Me a Coffee',
						},
						{ label: 'Ko-Fi', value: 'Ko-Fi' },
						{ label: 'Patreon', value: 'Patreon' },
						{ label: 'PayPal', value: 'PayPal' },
					] }
					onChange={ ( value ) => setNewUrlType( value ) }
				/>
				<TextControl
					label={ __( 'Donation Link Text', 'qb-donate' ) }
					value={ newUrlText }
					onChange={ ( value ) => setNewUrlText( value ) }
					help={ __(
						'Leave blank to use link type as text',
						'qb-donate'
					) }
				/>
				<TextControl
					label={ __( 'Donation Link URL', 'qb-donate' ) }
					value={ newUrl }
					onChange={ ( value ) => setNewUrl( value ) }
				/>
				<Button
					variant="primary"
					onClick={ addDonation }
					disabled={ ! newUrlType || ! newUrl }
				>
					{ __( 'Add Donation Link', 'qb-donate' ) }
				</Button>
			</div>
			<Flex direction="column">
				{ donations.length > 0 ? (
					donations.map( ( donation, index ) => (
						<div className="existing-donations" key={ index }>
							<div>
								<p className="donation-type">
									{ donation.type }
									{ donation.text.length > 0 &&
										' - ' + donation.text }
								</p>
								<p className="donation-url">{ donation.url }</p>
							</div>
							<div className="donation-delete">
								<Button
									onClick={ () => deleteDonation( index ) }
								>
									X
								</Button>
							</div>
						</div>
					) )
				) : (
					<FlexItem>
						<p id="empty-donations">
							{ __(
								'No donation links added yet.',
								'qb-donate'
							) }
						</p>
					</FlexItem>
				) }
			</Flex>
		</div>
	);
};

registerBlockType( metadata.name, {
	edit: Edit,
	save: () => {
		return <div className="qb-donate"></div>;
	},
} );
