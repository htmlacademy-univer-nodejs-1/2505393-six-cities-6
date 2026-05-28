import UpdateOfferDto from '../../dto/offer/update-offer.dto';
import CreateUserDto from '../../dto/user/create-user.dto';
import { TicketCreate, TicketEdit } from '../../types/ticket';
import { Signup } from '../../types/user';
import { OfferType, TicketType } from '../../const';
import CreateOfferDto from '../../dto/offer/create-offer.dto';
import { CommentPost } from '../../types/comment';
import CreateCommentDto from '../../dto/comment/create-comment.dto';
import { getTime } from '../utils';

export const adaptSignupToServer = (user: Signup): CreateUserDto => ({
  firstname: user.name,
  lastname: user.surname,
  email: user.email,
  password: user.password,
  avatarPath: ''
});

export const adaptEditTicketToServer = (
  ticket: TicketEdit
): UpdateOfferDto => ({
  title: ticket.title,
  description: ticket.description,
  categories: Array.isArray(ticket.categories) ? ticket.categories.map((cat: any) => typeof cat === 'string' ? cat : cat.id) : [],
  postDate: ticket.publishedDate,
  type: ticket.type === TicketType.Buy ? OfferType.Buy : OfferType.Sell,
  price: ticket.price,
});

export const adaptCreateTicketToServer = (
  ticket: TicketCreate
): CreateOfferDto => ({
  title: ticket.title,
  description: ticket.description,
  categories: Array.isArray(ticket.categories) ? ticket.categories.map((cat: any) => typeof cat === 'string' ? cat : cat.id) : [],
  postDate: getTime(),
  type: ticket.type === TicketType.Buy ? OfferType.Buy : OfferType.Sell,
  price: ticket.price,
  image: ''
});

export const adaptCreateCommentToServer = (
  comment: CommentPost
): CreateCommentDto => ({
  text: comment.text,
  offerId: comment.ticketId,
});

export const adaptAvatarToServer = (file: string) => {
  const formData = new FormData();
  formData.set('avatar', file);

  return formData;
};

export const adaptImageToServer = (file: string) => {
  const formData = new FormData();
  formData.set('image', file);

  return formData;
};
