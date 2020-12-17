import React, { FC } from 'react';
import './style.scss';
import { CommentDTO } from 'dto/CommentDTO';
import { useDisplayName } from 'hooks/useDisplayName';

interface CommentProps {
    commentData: CommentDTO;
    propsMessage?:string | undefined;
}

const Comment: FC<CommentProps> = (props: CommentProps): JSX.Element => {
    useDisplayName(props.propsMessage, Comment.displayName);

    return (
        <div>
            <div className="card text-dark bg-light mb-3" >
                <div className="customBody">
                    <h5 className="card-title">{props.commentData.name}</h5>
                    <p className="card-text">{props.commentData.body}</p>
                    <div className="blockquote mb-0">
                        <footer className="blockquote-footer">{props.commentData.email}</footer>
                    </div>
                </div>
            </div>
        </div>
    );
};

Comment.displayName = 'Comment Component';
export default Comment;