import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ValidosRoles } from 'src/interfaces';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from '@prisma/client';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }


  @Get("/tweets")
  @Auth(ValidosRoles.user)
  getTweetsByUser(
    @GetUser() user: User
  ) {
    return this.profileService.getTweetsByUser(user);
  }

  @Get("/comments")
  @Auth(ValidosRoles.user)
  getCommentsByUser(
    @GetUser() user: User
  ) {
    return this.profileService.getCommentsByUser(user);
  }


  @Get("/likes")
  @Auth(ValidosRoles.user)
  getLikesByUser(
    @GetUser() user: User
  ) {
    return this.profileService.getLikesByUser(user);
  }

  @Get("/followers")
  getFollowers() {
    return this.profileService.getFollowers();
  }

  @Get("/followings")
  getFollowings() {
    return this.profileService.getFollowings();
  }


  @Post("/action/follow:followedUser")
  @Auth(ValidosRoles.user)
  followUser(
    @GetUser() user: User,
    @Param("followedUser") followedUser: string
  ) {
    return this.profileService.followUser(user, followedUser);
  }

}

