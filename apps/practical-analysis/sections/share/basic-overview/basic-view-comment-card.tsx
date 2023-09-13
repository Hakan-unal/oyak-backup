import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import Loading from '@libs/components/molecules/loading/loading';
import TranslatedText from '@libs/components/molecules/text/translated-text';
import useModal from '@libs/hooks/useModal';
import { BasicViewCommentRequestModel } from '@libs/models/finnet';

import {
  SENTENCES_PREFIX,
  SpecialCommentKeywordProps,
  SPECIAL_COMMENT_KEYWORDS,
} from './constants';
import { getBasicViewCommentHandler } from 'prac-analysis/actions/finnet-api';
import { QUERY_KEYS } from 'prac-analysis/constants/query-keys';

interface Props {
  serviceParams?: BasicViewCommentRequestModel;
}

const BasicViewCommentCard = ({ serviceParams }: Props) => {
  const { t } = useTranslation();
  const { AlertModal, infoAlert } = useModal();

  const { data, isFetching, refetch } = useQuery(
    QUERY_KEYS.BASIC_VIEW_COMMENT_LIST,
    () => getBasicViewCommentHandler(serviceParams),
  );

  useEffect(() => {
    refetch();
  }, [ refetch, serviceParams ]);

  const commentList: string[] = useMemo(
    () =>
      data?.JSVeriler?.filter((comment) =>
        comment.s?.Baslik?.startsWith(SENTENCES_PREFIX),
      ).map((row) => row?.s?.YorumTablosu) || [],
    [ data ],
  );

  const handleSpecialKeywordModal = (
    specialKeywordInfo: SpecialCommentKeywordProps,
  ) => {
    infoAlert({
      title       : specialKeywordInfo.title,
      text        : specialKeywordInfo.text,
      hideButtons : true,
    });
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className='flex flex-col gap-4 sm:gap-6'>
      <TranslatedText
        label='general_basicOverview_basicİnfos_title'
        textVariant='body1'
      />

      <ul className='px-4 list-disc'>
        {commentList
          .filter((comment) => !!comment)
          .map((comment) => {
            const specialKeywordInfo = SPECIAL_COMMENT_KEYWORDS?.find((keyword) =>
              comment?.includes(t(keyword.buttonName)),
            );

            return (
              <li key={comment}>
                <TranslatedText
                  components={{
                    b: specialKeywordInfo ? (
                      <a
                        className='text-primary-dark cursor-pointer font-bold'
                        onClick={() =>
                          handleSpecialKeywordModal(specialKeywordInfo)
                        }
                      />
                    ) : (
                      <label />
                    ),
                  }}
                  label={comment}
                />
              </li>
            );
          })}
      </ul>

      <AlertModal />
    </div>
  );
};

export default BasicViewCommentCard;
