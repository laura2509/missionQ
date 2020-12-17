import { PostDTO } from 'dto/PostDTO';
import { UserDTO } from 'dto/UserDTO';
import { useDisplayName } from 'hooks/useDisplayName';
import React, { FC } from 'react';
import './style.scss';

interface CardProps {
    postData?: PostDTO;
    userData?: UserDTO;
    commentsNumber?: number,
    openPostButton?: boolean;
    onPostClick?: (id: number | undefined) => void;
    propsMessage?: string | undefined;
}

const Card: FC<CardProps> = (props: CardProps): JSX.Element => {
    useDisplayName(props.propsMessage, Card.displayName);

    const onOpenPostClick = () => {
        if (props.onPostClick) {
            props.onPostClick(props.postData?.id);
        }
    };

    return (
        <div>
            <div className="card border-primary mb-3 cardCustom">
                <div className="card-body">
                    <h5 className="card-title">{props.postData?.title}</h5>
                    <p className="card-text">{props.postData?.body}</p>
                    {props.commentsNumber &&
                        <div className="comment">
                            <i className="bi bi-chat-left icon" />
                            <p className="number">{(props.commentsNumber > 99) ? '99+' : props.commentsNumber}</p>
                        </div>
                    }

                    <div className="blockquote mb-0">
                        <footer className="blockquote-footer text-dark footerLeft">{props.userData?.name}</footer>
                        {props.openPostButton &&
                            <button className="btn btn-primary footerRight"
                                onClick={onOpenPostClick} >
                                Open post
                            </button>}
                    </div>
                </div>
            </div>
        </div >
    );
};

Card.displayName = 'Card Component';
export default Card;