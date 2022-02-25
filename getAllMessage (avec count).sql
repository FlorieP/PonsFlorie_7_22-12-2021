select * from messages
join users on messages.userId = users.id
left join (
	select count(comments.id) as nbComments, comments.messageId as countMessageId
	from comments
	group by comments.messageId
) as messagesCount
on messages.id = messagesCount.countMessageId
left join (
	select count(likes.id) as nbLikes, likes.messageId as countLikeId
	from likes
	group by likes.messageId
) as likeCount
on messages.id = likeCount.countLikeId