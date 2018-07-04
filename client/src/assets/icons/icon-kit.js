import React from 'react'
import { withBaseIcon } from 'react-icons-kit'
import { connection } from 'react-icons-kit/icomoon'
import {ic_person_pin_circle} from 'react-icons-kit/md/ic_person_pin_circle'
import { cog } from 'react-icons-kit/icomoon'
import { switchIcon } from 'react-icons-kit/icomoon'
import {ic_person_add} from 'react-icons-kit/md/ic_person_add'
import {refresh} from 'react-icons-kit/fa/refresh'
import {ic_file_download} from 'react-icons-kit/md/ic_file_download'
import {plane} from 'react-icons-kit/entypo/plane'
import {more} from 'react-icons-kit/ionicons/more'

const NetworkContainer = 
    withBaseIcon({ size: 30, style: {color: '#f2f2f2', marginLeft:650 }});

const PeerContainer = 
    withBaseIcon({ size: 30, style: {color: '#f2f2f2', marginLeft:700 }});

const ConfigContainer = 
    withBaseIcon({ size: 30, style: {color: '#f2f2f2', marginLeft:750 }});

const QuitContainer = 
    withBaseIcon({ size: 30, style: {color: '#f2f2f2', marginLeft:800 }});

const ContactContainer = 
    withBaseIcon({ size: 30, style: {color: '#f2f2f2'}});

const RefreshContainer = 
    withBaseIcon({ size: 30, style: {color: '#f2f2f2'}});

const DownloadContainer = 
    withBaseIcon({ size: 30, style: {color: '#f2f2f2'}});
    
const SendContainer = 
    withBaseIcon({ size: 30, style: {color: '#f2f2f2'}});
    
const MoreContainer = 
    withBaseIcon({ size: 30, style: {color: '#f2f2f2'}});

export const Network = () => <NetworkContainer icon={connection}/>
export const Peer = () => <PeerContainer icon={ic_person_pin_circle}/>
export const Config = () => <ConfigContainer icon={cog}/>
export const Quit = () => <QuitContainer icon={switchIcon}/>

export const Contact = () => <ContactContainer icon={ic_person_add}/>
export const Refresh = () => <RefreshContainer icon={refresh}/>
export const Download = () => <DownloadContainer icon={ic_file_download}/>
export const Send = () => <SendContainer icon={plane}/>
export const More = () => <MoreContainer icon={more}/>


