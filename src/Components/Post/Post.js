import { useEffect } from 'react'
import apis from '../../Apis' 
import './Post.css'
import {Avatar} from "@material-ui/core"
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import InputOption from '../Feed/InputOption'

const Post = ({name, description, updatedAt, message,photoUrl}) => {
	useEffect(() => {
		apis.posts.getAll()
			.then()
            .catch()
            
	}, [])
	return (
		<div className="post">
			<div className="post_header">
				<Avatar src={photoUrl}/>

				<div className="post_info">
					<h2>{name}</h2>
					<p>{description}</p>
					<p>{updatedAt}</p>
				</div>
			</div>

			<div className="post_body">
				<p>{message}</p>
			</div>

			<div className="post_buttons">
				<InputOption Icon={ThumbUpAltOutlinedIcon} title="추천" color="gray"/>
				<InputOption Icon={ChatOutlinedIcon} title="댓글" color="gray"/>
				<InputOption Icon={ShareOutlinedIcon} title="공유" color="gray"/>
				<InputOption Icon={SendOutlinedIcon} title="보내기" color="gray"/>

			</div>
		</div>
	)
}

export default Post