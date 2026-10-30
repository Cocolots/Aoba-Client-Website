import Image from "next/image";
import Link from "next/link";

export type GithubAvatar = {
    login: string,
    id: number,
    node_id: string,
    avatar_url : string,
    gravatar_id: number,
    url: string,
    html_url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    starred_url: string,
    subscriptions_url: string,
    organizations_url: string,
    repos_url: string,
    events_url: string,
    received_events_url: string,
    type: string,
    site_admin: boolean,
    contributions: number
}

export const ContributorWidget = async () => {
    const githubData = await fetch("https://api.github.com/repos/Cocolots/Aoba-Client/contributors", {
        next: { revalidate: 3600 }
    }).then((res) => res.json());

    if (!Array.isArray(githubData)) {
        return null;
    }

    return (
        <div className="flex flex-wrap justify-center mx-auto">
            {githubData.map((contributor: GithubAvatar) => {
                const avatarUrl = new URL(contributor.avatar_url);
                avatarUrl.searchParams.set("s", "250");
                return (
                <div key={contributor.login} className="border border-zinc-500 bg-zinc-800 rounded-lg px-10 py-5 m-2 text-center">
                    <Link prefetch={false} href={contributor.html_url}>
                        <Image
                            className="mt-2 mb-2 m-auto rounded-full"
                            src={avatarUrl.toString()}
                            alt={contributor.login}
                            width={125}
                            height={125}
                            unoptimized
                        />
                    </Link>
                    <h2 className={`border-b border-zinc-500 ${contributor.login === "Cocolots" ? "text-yellow-500" : "text-white"}`}>
                        {contributor.login}
                    </h2>
                    <p>
                        {contributor.contributions} {contributor.contributions > 1 ? "contributions" : "contribution"}
                    </p>
                </div>
                );
            })}
        </div>
    );
};

export default ContributorWidget;
