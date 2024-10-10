import TopMainNav from '@/components/navBar/top-main-nav';
import TopBasicNav from '@/components/navBar/top-basic-nav';
import TopSearchNav from '@/components/navBar/top-search-nav';
import TopUploadNav from '@/components/navBar/top-upload-nav';
import TopChatNav from '@/components/navBar/top-chat-nav';
import RoundButton from '@/components/button/roundButton';
import Button from '@/components/button/button';
import UserFollow from '@/components/user/user-follow';

export default function Home() {
  const user1 = {
    handle: 'sdknlsknds',
    username: '김밥',
    is_following: true,
    is_follower: false,
    profile: {
      profile_image: '/favicon.ico',
    },
  };
  const user2 = {
    handle: 'sdknlsknds',
    username: '김밥',
    is_following: false,
    is_follower: false,
    profile: {
      profile_image: '/favicon.ico',
    },
  };
  const user3 = {
    handle: 'sdknlsknds',
    username: '김밥',
    profile: {
      profile_image: '/favicon.ico',
    },
  };
  return (
    <main className="flex flex-1 flex-col overflow-auto space-y-10 items-center sm:items-start">
      <TopMainNav>이별 =(눈물+슬픔)²/(술×담배연기)⁴-(사랑+약속+추억)+(미움+물거품+잿빛하늘)</TopMainNav>
      <TopBasicNav></TopBasicNav>
      <TopSearchNav></TopSearchNav>
      <TopUploadNav></TopUploadNav>
      <TopChatNav>애월시 애월읍 어쩌구</TopChatNav>
      <RoundButton>발동</RoundButton>
      <RoundButton intent={'active'}>발동</RoundButton>
      <RoundButton intent={'outline'}>발동</RoundButton>
      <RoundButton intent={'disabled'}>발동</RoundButton>
      <Button intent={'default'} colorScheme={'default'}>
        안녕
      </Button>
      <Button intent={'default'} colorScheme={'indigo'}>
        안녕
      </Button>
      <Button intent={'default'} colorScheme={'blue'}>
        안녕
      </Button>
      <Button intent={'outline'} colorScheme={'default'}>
        안녕
      </Button>
      <Button intent={'outline'} colorScheme={'indigo'}>
        안녕
      </Button>
      <Button intent={'outline'} colorScheme={'blue'}>
        안녕
      </Button>
      <Button intent={'disabled'} colorScheme={'default'}>
        안녕
      </Button>
      <Button intent={'disabled'} colorScheme={'indigo'}>
        안녕
      </Button>
      <Button intent={'disabled'} colorScheme={'blue'}>
        안녕
      </Button>
      <UserFollow user={user1} />
      <UserFollow user={user2} />
      <UserFollow user={user3} />
    </main>
  );
}
