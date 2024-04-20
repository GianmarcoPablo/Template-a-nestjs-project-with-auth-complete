import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Cron, Interval } from '@nestjs/schedule';
import { TrendService } from 'src/trend/trend.service';

@Injectable()
export class TweetService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly trendService: TrendService
  ) { }

  async create(createTweetDto: CreateTweetDto, user: User) {
    // creamos el tweet
    const tweet = await this.prisma.tweet.create({
      data: {
        ...createTweetDto,
        userId: user.id
      }
    })

    // creamos los hashtags del tweet
    const hashtags = createTweetDto.content.match(/#\w+/g);
    if (hashtags) {
      for (const hashtag of hashtags) {
        await this.createHashtag(tweet.id, hashtag);
      }
    }

    return tweet;
  }


  async findAll(paginationDto: PaginationDto) {
    const { offset, limit } = paginationDto;
    const tweets = await this.prisma.tweet.findMany({
      take: limit,
      skip: offset,
      select: {
        content: true,
        id: true,
        user: { select: { name: true, lastName: true } },
        Like: { select: { id: true } }
      }
    })

    // contar los likes de cada tweet

    const tweetsWithLikes = tweets.map(tweet => {
      return {
        ...tweet,
        likesCount: tweet.Like.length
      }
    });

    return {
      data: tweetsWithLikes,
      meta: {
        offset,
        limit,
        total: tweets.length
      }
    };
  }

  findOne(id: string) {
    const tweet = this.prisma.tweet.findUnique({ where: { id } })
    if (!tweet) throw new NotFoundException('Tweet no encontrado');
    return tweet;
  }

  // solo si el usuario es premium puede actualizar un tweet, pero tiene que ser el dueño del tweet
  update(id: number, updateTweetDto: UpdateTweetDto) {
    return `This action updates a #${id} tweet`;
  }

  async remove(id: string, user: User) {
    const tweet = await this.findOne(id);
    if (tweet.userId !== user.id) throw new BadRequestException('No puedes eliminar un tweet que no es tuyo');

    await this.prisma.tweet.delete({
      where: {
        id
      }
    });

    return 'Tweet eliminado';
  }

  private async createHashtag(tweetId: string, hashtag: string) {
    // buscamos el hashtag
    const existingHashtag = await this.prisma.hashtag.findFirst({
      where: {
        name: hashtag,
      }
    });

    // si no existe lo creamos y si existe incrementamos el contador de veces que se ha usado
    if (!existingHashtag) {
      await this.prisma.hashtag.create({
        data: {
          name: hashtag,
          tweetId: tweetId
        }
      });
    } else {
      await this.prisma.hashtag.update({
        where: {
          id: existingHashtag.id
        },
        data: {
          hashtagCount: existingHashtag.hashtagCount + 1
        }
      });
    }
  }

  async likeTweet(tweetId: string, userId: string) {
    const existingLike = await this.prisma.like.findFirst({
      where: {
        tweetId,
        userId
      }
    });

    if (existingLike) {
      await this.prisma.like.delete({
        where: {
          id: existingLike.id
        }
      });

    } else {
      await this.prisma.like.create({
        data: {
          tweetId,
          userId
        }
      });
    }

    return "Accion realizada con exito"
  }

  @Cron('0 0 * * *') // Ejecutar a la medianoche cada día
  async handleCron() {
    await this.trendService.createTrend();
  }

}
