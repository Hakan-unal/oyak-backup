/* eslint-disable no-nested-ternary */

import UserInfoCardSkeleton from './skeleton';
import Card from '@libs/components/atomic/card/card';
import Text from '@libs/components/atomic/text/text';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import { getInitials } from '@libs/utils/string.utils';

interface UserInfoCardProps {
  isLoading?: boolean;
  fullName?: string | null;
  cardClassName?: string;
}

const UserInfoCard = ({
  isLoading,
  fullName,
  cardClassName,
}: UserInfoCardProps) =>
  isLoading ? (
    <UserInfoCardSkeleton />
  ) : fullName ? (
    <Card className={cardClassName}>
      <div className='flex flex-row items-center'>
        <Text
          className='rounded-full border-primary-dark border-2 text-sm leading-4 font-medium p-3 mr-4'
          textColor='text-basic-six'
        >
          {getInitials(fullName!)}
        </Text>
        <TranslatedText
          className='flex flex-col sm:flex-row text-base lg:text-lg text-single-line gap-0 sm:gap-1'
          components={[ <strong key='0' /> ]}
          label='dashboard_welcomeCard_card_welcome_title'
          textColor='text-basic-six'
          values={{ fullName }}
        />
      </div>
    </Card>
  ) : null;

export default UserInfoCard;
