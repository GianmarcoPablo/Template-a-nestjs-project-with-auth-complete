import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { ValidosRoles } from 'src/interfaces';
import { User } from '@prisma/client';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post()
  @Auth(ValidosRoles.user, ValidosRoles.admin)
  create(
    @GetUser() user: User,
    @Body() createCommentDto: CreateCommentDto
  ) {
    return this.commentService.create(createCommentDto, user);
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(
    @GetUser() user: User,
    @Param('id') id: string
  ) {
    return this.commentService.remove(id, user);
  }
}
