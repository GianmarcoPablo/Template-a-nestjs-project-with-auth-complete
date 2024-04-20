import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {

  constructor(
    private readonly prisma: PrismaService
  ) { }

  async create(createCommentDto: CreateCommentDto, user: User) {
    const comment = await this.prisma.comment.create({
      data: {
        ...createCommentDto,
        userId: user.id
      }
    })

    return comment;
  }

  findAll() {
    return `This action returns all comment`;
  }

  async findOne(id: string) {
    const comment = await this.prisma.comment.findUnique({ where: { id } })
    if (!comment) throw new NotFoundException('Comment not found')
    return comment;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  async remove(id: string, user: User) {
    const comment = await this.findOne(id)
    if (comment.userId !== user.id) {
      throw new UnauthorizedException('Tu no puedes eliminar este comentario')
    }
    await this.prisma.comment.delete({ where: { id } })
    return "Accion realizada con exito"
  }
}
